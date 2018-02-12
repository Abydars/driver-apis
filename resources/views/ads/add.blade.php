@extends('layouts.app')

@section('top')
    <a href="{{ route('admin.ads') }}" class="btn btn-danger">Cancel</a>
@endsection

@push('styles')
<style>
    #preview {
        max-width: 100%;
        border: 1px solid;
    }
</style>
@endpush

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body pb0">
                    @if($error)
                        <div class="alert alert-danger">{{ $error }}</div>
                    @endif
                    {!! Form::open(['id' => 'new-ad-form', 'enctype' => 'multipart/form-data']) !!}
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Title:</label>
                            <div class="col-md-11 col-sm-10">
                                {!! Form::text('title', null, ['class' => 'form-control']) !!}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Content:</label>
                            <div class="col-md-11 col-sm-10">
                                {!! Form::textarea('content', null, ['class' => 'form-control']) !!}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Contact Email:</label>
                            <div class="col-md-11 col-sm-10">
                                {!! Form::email('email', null, ['class' => 'form-control']) !!}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Ad Image:</label>
                            <div class="col-md-11 col-sm-10">
                                {!! Form::file('image', null, ['class' => 'form-control']) !!}
                                <img id="preview"/>
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group text-right">
                        <div class="col-md-12">
                            <input type="submit" class="btn btn-success"/>
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
        $main_form = $('#new-ad-form');
        $main_form.submit(function () {
            return true;

            var data = $main_form.serializeArray();

            $.notify(window.custom.messages.processing);

            $.ajax({

                type: 'POST',
                dataType: 'JSON',
                data: data,
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