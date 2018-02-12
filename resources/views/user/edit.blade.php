@extends('layouts.app')

@section('top')
    <a href="{{ route('admin.user.approve', [$user->id]) }}"
       class="btn btn-success">{{ $user->status == 'active' ? 'Approved' : 'Approve User' }}</a>
    <a href="{{ route('admin.user.suspend', [$user->id]) }}"
       class="btn btn-danger">{{ $user->status == 'suspended' ? 'Suspended' : 'Suspend User' }}</a>
    <a href="{{ route('admin.users') }}" class="btn btn-primary">Back to Users</a>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body pb0">
                    {!! Form::open(['id' => 'user-update-form']) !!}
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Email Address:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::text('email', $user->email, ['class' => 'form-control', 'disabled' => 'disabled']) }}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Username:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::text('username', $user->username, ['class' => 'form-control', 'disabled' => 'disabled']) }}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Phone:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::text('phone', $user->phone, ['class' => 'form-control']) }}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Company:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::text('company', $user->company, ['class' => 'form-control']) }}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Address:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::text('address', $user->address, ['class' => 'form-control']) }}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">ABN:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::text('abn', $user->abn, ['class' => 'form-control']) }}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Car Number:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::text('car_number', $user->car_number, ['class' => 'form-control']) }}
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group text-right">
                        <div class="col-md-12">
                            <input type="submit" class="btn btn-success" disabled="disabled"/>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    {!! Form::close() !!}
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    jQuery(function ($) {
        $main_form = $('#user-update-form');
        $main_form.submit(function () {

            $.notify(window.custom.messages.processing);

            $.ajax({
                url: '{{ route('user.update', $user->id) }}',
                type: 'PUT',
                dataType: 'JSON',
                data: $main_form.serializeArray(),
                success: function (data) {
                    $.notify.closeAll();
                    $.notify(data);
                },
                error: function (e) {
                    $.notify.closeAll();
                    $.notify(window.custom.messages.internal_error);
                }
            });

            return false;
        });
    });
</script>
@endpush